package com.ssafy.lam.hashtag.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    Optional<Hashtag> findByTagName(String tagName);
}
