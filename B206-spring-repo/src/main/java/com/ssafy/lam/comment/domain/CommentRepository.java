package com.ssafy.lam.comment.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByFreeboardFreeboardSeqAndIsDeletedFalse(Long freeboardSeq);
}
