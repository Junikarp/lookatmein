import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosApi from "../../api/axiosApi";
import "react-toastify/dist/ReactToastify.css";
import DaumPostcode from "react-daum-postcode";
import { Modal, Button } from "antd";
import styles from "./HospitalRegistForm.module.css";
import logo from "../../assets/logo.png";

//회원가입 시 입력하는 정보 유효성 검사
const validationSchema = yup.object({
  id: yup.string().required("아이디를 입력하세요."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{8,16}$/,
      "영문+숫자+특수문자 조합으로 8~16글자를 입력하세요."
    )
    .required("비밀번호를 입력하세요."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 다시 입력하세요."),
  email: yup
    .string()
    .email("올바른 이메일 형식을 입력하세요.")
    .required("이메일을 입력하세요."),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "숫자만 입력하세요.")
    .required("전화번호를 입력하세요."),
});

function HospitalRegistForm() {
  const navigate = useNavigate();

  //사용 가능한 정보인지 검사
  const [useable, setUseable] = useState(null);
  const [tag, setTag] = useState(''); // 사용자 입력을 관리하는 로컬 상태


  //아이디 중복체크
  const checkDuplicateId = (e) => {
    e.preventDefault();
    axiosApi
      .get(`/api/user/regist/idcheck/${formik.values.id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data === true) {
          //alert("사용 불가한 아이디입니다."); //이미 사용중인 아이디
          setUseable(false);
        } else if (response.data === false) {
          //alert("사용 가능한 아이디입니다.");
          setUseable(true);
        } else {
          // alert("사용 불가한 아이디입니다.");
        }
      });
  };

  // 사업자 등록증
  const [businessRegistrationCertificate, setBusinessRegistrationCertificate] =
    useState(null);

  // 파일 업로드 핸들러
  const handleFileChange = (e) => {
    setBusinessRegistrationCertificate(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
      confirmPassword: "",
      name: "", // 병원명->밑에 이름 다 바꿔!!
      address: "",
      url: "", //병원 홈페이지 주소
      email: "",
      phoneNumber: "", //병원 전화번호
      categoryList: [],
      info: "", // 병원 소개 멘트
      open: "", // 오픈 시간
      close: "", // 닫는 시간
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      // Hospital 정보를 "hospital" 객체 내부에 넣어서 추가

      const hospital ={
        hospitalInfo_id: values.id,
        hospitalInfo_password: values.password,
        hospitalInfo_name: values.name,
        hospitalInfo_address: values.address,
        hospitalInfo_url: values.url,
        hospitalInfo_email: values.email,
        hospitalInfo_phoneNumber: values.phoneNumber,
      }

      if(values.info){
        hospital["hospitalInfo_introduce"] = values.info;
      }

      if(values.open){
        hospital["hospitalInfo_open"] = values.open;
      }

      if(values.close){
        hospital["hospitalInfo_close"] = values.close;
      }
      // 비즈니스 등록증 파일 추가
      // hospital["businessRegistrationCertificate"] = businessRegistrationCertificate; 

      // formData.append("hospital", JSON.stringify(hospital));

      // 카테고리 정보를 추가
      const categoryList = []

      // CategoryList 배열 정보를 추가
      values.categoryList.forEach((category, index) => {
        categoryList.push({part: category});
      });

      const hospitalDto = {}
      hospitalDto["hospital"] = hospital;
      hospitalDto["categoryList"] = categoryList;

      formData.append("hospital", JSON.stringify(hospitalDto));
      formData.append("registrationFile", businessRegistrationCertificate);



      for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
     }
      
      try {
        await axiosApi.post("/api/hospital/regist", formData, {
          // 서버에게 클라이언트가 보내는 데이터의 유형을 알려주는 것.
          headers: {
            "Content-Type": "multipart/form-data", //multipart/form-data는 폼 데이터가 파일이나 이미지와 같은 바이너리 데이터를 포함할 수 있음을 나타냄
          },
        });
        
        window.alert("회원가입이 완료되었습니다. 승인을 대기해주세요");
        
          navigate("/");
        
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  // 비밀번호 일치 체크
  const isPasswordMatch =
    formik.values.password === formik.values.confirmPassword &&
    formik.values.password !== "";

  //우편주소 api 사용한 부분

  //modalVisible은 모달이 보여질지 말지를 결정하는 불리언 값
  //setModalVisible 함수는 이 값을 변경하는 데 사용(showModal, closeModal에서 사용함)
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    formik.setFieldValue("address", fullAddress);
    setModalVisible(false); // 모달 닫기
  };
  //주소 입력 버튼을 클릭했을 때 모달을 보여주기
  const showModal = () => {
    setModalVisible(true);
  };
  //모달을 닫을 때 사용되며, modalVisible을 false로 설정
  const closeModal = () => {
    setModalVisible(false);
  };

  const addTag = () => {
    // 입력된 태그가 비어있지 않은 경우에만 추가
    if (tag) {
      const newTags = [...formik.values.categoryList, tag];
      formik.setFieldValue('categoryList', newTags);
      setTag(''); // 입력 필드 초기화
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.HospitalRegistForm}>
        <img src={logo} alt="로고" id={styles.logo} />
        <form onSubmit={formik.handleSubmit}>
          <div className="inputText">
            <h3 className={styles.text}>아이디</h3>
            <input
              type="text"
              placeholder="abcd1234"
              name="id"
              value={formik.values.id}
              id={styles.inputB}
              onChange={formik.handleChange}
              className={formik.touched.id && formik.errors.id ? "error" : ""}
            />
            <button onClick={checkDuplicateId} className={styles.button}>
              중복확인
            </button>
            {formik.touched.id && formik.errors.id && (
              <div className="helperText">{formik.errors.id}</div>
            )}

            {useable === null ? (
              ""
            ) : useable ? (
              <span>사용가능한 아이디입니다.</span>
            ) : (
              <span>이미 사용중인 아이디 입니다.</span>
            )}
          </div>
          <div className="inputText">
            <h3 className={styles.text}>비밀번호</h3>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              placeholder="영문, 숫자, 특수문자 조합 8~16자를 입력하세요"
              value={formik.values.password}
              id={styles.input}
              className={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
            />
            {formik.touched.password && formik.errors.password && (
              <div className="helperText">{formik.errors.password}</div>
            )}
          </div>
          <div className="inputText">
            <h3 className={styles.text}>비밀번호 확인</h3>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              id={styles.input}
              placeholder="비밀번호 확인"
              style={{ color: isPasswordMatch ? "green" : "inherit" }} // 조건부 스타일 적용
            />
            {isPasswordMatch && (
              <div style={{ color: "green" }}>비밀번호가 일치합니다.</div>
            )}
          </div>
          <div className="inputText">
            <h3 className={styles.text}>병원명</h3>
            <input
              type="text"
              placeholder="병원 이름"
              name="name"
              value={formik.values.name}
              id={styles.input}
              onChange={formik.handleChange}
              className={
                formik.touched.name &&
                formik.errors.name
                  ? "error"
                  : ""
              }
            />
            {formik.touched.name &&
              formik.errors.name && (
                <div className="helperText">
                  {formik.errors.name}
                </div>
              )}
          </div>
          <div className="inputText">
            <h3 className={styles.text}>주소</h3>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              id={styles.inputB}
              readOnly
            />
            <button type="button" onClick={showModal} className={styles.button}>
              주소 입력
            </button>
            <Modal
              title="주소 검색"
              open={modalVisible}
              onCancel={closeModal}
              footer={null}
            >
              <DaumPostcode onComplete={handleAddress} />
            </Modal>
          </div>

          <div className="inputText">
            <h3 className={styles.text}>홈페이지</h3>
            <input
              type="text"
              name="url"
              placeholder="홈페이지 URL"
              value={formik.values.url}
              onChange={formik.handleChange}
              id={styles.input}
              className={formik.touched.url && formik.errors.url ? "error" : ""}
            />
            {formik.touched.url && formik.errors.url && (
              <div className="helperText">{formik.errors.url}</div>
            )}
          </div>

          <div className="inputText">
            <h3 className={styles.text}>이메일</h3>
            <input
              type="text"
              name="email"
              placeholder="이메일"
              value={formik.values.email}
              onChange={formik.handleChange}
              id={styles.input}
              className={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <div className="helperText">{formik.errors.email}</div>
            )}
          </div>
          <div className="inputText">
            <h3 className={styles.text}>병원 Tel</h3>
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              id={styles.input}
              className={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "error"
                  : ""
              }
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="helperText">{formik.errors.phoneNumber}</div>
            )}
          </div>
          <div className="inputText">
      <h3 className={styles.text}>해시태그</h3>
      <input
        type="text"
        name="tag"
        placeholder="해시태그 입력 후 추가 버튼 클릭"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        id={styles.input}
      />
      <button type="button" onClick={addTag}>추가</button>
      {/* 이미 추가된 해시태그 목록을 보여줌 */}
      {formik.values.categoryList.map((category, index) => (
        <div key={index}>{category}</div>
      ))}
    </div>
          {/* 선택적 필드: 병원 소개, 오픈 시간, 닫는 시간 */}
          <div className="inputText">
            <h3 className={styles.text}>병원 소개 (선택 사항)</h3>
            <input
              type="text"
              name="info"
              placeholder="병원 소개"
              value={formik.values.info}
              id={styles.input}
              onChange={formik.handleChange}
            />
          </div>
          <div className="inputText">
            <h3 className={styles.text}>오픈 시간 (선택 사항)</h3>
            <input
              type="text"
              name="open"
              placeholder="오픈 시간"
              value={formik.values.open}
              id={styles.input}
              onChange={formik.handleChange}
            />
          </div>
          <div className="inputText">
            <h3 className={styles.text}>닫는 시간 (선택 사항)</h3>
            <input
              type="text"
              name="close"
              placeholder="닫는 시간"
              value={formik.values.close}
              id={styles.input}
              onChange={formik.handleChange}
            />
          </div>
          {/* 사업자 등록증 파일 업로드 */}
          {/* `${styles.fileup} ${styles.inputText}` */}
          <div className={styles.inputText}>
            <h3 className={styles.text}>사업자 등록증</h3>
            <div className={styles.fileup}>
              {/* <span>파일 선택</span> */}
              <input
                type="file"
                name="businessRegistrationCertificate"
                className={styles.FileInput_hidden_overlay}
                onChange={handleFileChange}
                placeholder="파일 선택"
              />
            </div>
          </div>
          {/* 회원가입 버튼 */}
          <div className="RegistButton">
            <button type="submit" className={styles.RegistButton}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default HospitalRegistForm;