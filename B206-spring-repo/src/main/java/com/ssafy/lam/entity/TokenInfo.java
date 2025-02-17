package com.ssafy.lam.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Builder
@Data
@AllArgsConstructor
@ToString
public class TokenInfo {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
