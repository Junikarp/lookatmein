import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user";
import { logoutHospital } from "../redux/hospital";
import { logoutCustomer } from "../redux/customer";

function Nav() {
  const user = useSelector((state) => state.user);
  const hospital = useSelector((state) => state.hospital);
  const isLogin = user.userSeq !== "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 메뉴 표시 상태를 제어하기 위한 상태 변수
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutHospital());
    dispatch(logoutCustomer());
    navigate("/");
  };

  const [showDropdown, setShowDropdown] = useState(false);
  // 드롭다운 메뉴를 토글하는 함수들
  // const toggleDropdownMenu = () => setShowDropdown((prevState) => !prevState);

  // 드롭다운을 보여주는 함수
  const showDropdownMenu = () => {
    setShowDropdown(true);
  };

  // 드롭다운을 숨기는 함수
  const hideDropdownMenu = () => {
    setShowDropdown(false);
  };
  const [activeLink, setActiveLink] = useState(null);

  // 변경: 클릭한 링크에 따라 상태를 업데이트하는 함수입니다.
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // 클릭된 링크의 이름을 상태로 저장합니다.
  };

  return (
    /* <nav
className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}
> */
    <nav className={styles.navBar}>
      <Link to="/" className={styles.nav0}>
        <img src={logo} alt="룩앳미인 로고" width="120px" />
        &nbsp; <span>룩앳미인</span>
      </Link>
      {/* 모바일 뷰에서 보일 메뉴 버튼 */}
      {/* <button className={styles.menuButton}>Menu</button> */}
      {/* 메뉴 내용 */}
      {/* <div className={`${styles.navContainer} ${showMenu ? styles.show : ""}`}> */}
      <div className={styles.nav1}>
        <Link
          to="/hospitalList"
          className={`${styles.menu} ${
            activeLink === "hospitalList" ? styles.active : ""
          }`}
          onClick={() => handleLinkClick("hospitalList")}
        >
          병원 정보
        </Link>
        <Link to="/reviewBoard/list" className={styles.menu}>
          시술 후기
        </Link>
        <Link to="/freeBoard/freeBoardList" className={styles.menu}>
          자유게시판
        </Link>
        <div
          className={`${styles.dropdown} ${styles.menu}`}
          onMouseEnter={showDropdownMenu}
          onMouseLeave={hideDropdownMenu}
        >
          PLAY
          {showDropdown && (
            <div
              className={`${styles.dropdownContent} ${
                showDropdown ? styles.show : ""
              }`}
            >
              <Link to="/face" className={styles.menu}>
                얼굴 비대칭
              </Link>
              <Link to="/worldcup" className={styles.menu}>
                이상향 월드컵
              </Link>
              <Link to="/canvas" className={styles.menu}>
                얼굴 성형
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.nav2}>
        {!isLogin ? (
          <>
            <Link to="/login" className={styles.menu}>
              로그인
            </Link>
            <Link to="/regist" className={styles.menu}>
              회원가입
            </Link>
          </>
        ) : (
          <>
            <Link to="/requestBoard/requestBoardList" className={styles.menu}>
              상담요청 게시판
            </Link>
            {/* 조건부 렌더링을 사용하여 다른 마이페이지 링크를 표시 */}
            {user.role === "CUSTOMER" && (
              <Link to="/mypage" className={styles.menu}>
                마이페이지
              </Link>
            )}
            {user.role === "HOSPITAL" && (
              <Link to="/hospital-mypage" className={styles.menu}>
                마이페이지
              </Link>
            )}
            {user.role === "ADMIN" && (
              <Link to="/admin-mypage" className={styles.menu}>
                마이페이지
              </Link>
            )}
            <div
              onClick={handleLogout}
              className={`${styles.cursor} ${styles.menu}`}
            >
              로그아웃
            </div>
          </>
        )}
      </div>
      {/* </div> */}
    </nav>
  );
}

export default Nav;
