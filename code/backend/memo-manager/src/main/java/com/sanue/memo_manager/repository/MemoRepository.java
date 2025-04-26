package com.sanue.memo_manager.repository;

import com.sanue.memo_manager.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {
}