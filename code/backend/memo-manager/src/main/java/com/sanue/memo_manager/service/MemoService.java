package com.sanue.memo_manager.service;

import com.sanue.memo_manager.entity.Memo;
import com.sanue.memo_manager.repository.MemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemoService {

    @Autowired
    private MemoRepository memoRepository;

    public List<Memo> getAllMemos() {
        return memoRepository.findAll();
    }

    public Optional<Memo> getMemoById(Integer id) {
        return memoRepository.findById(id);
    }

    public Memo createMemo(Memo memo) {
        memo.setCreatedAt(LocalDateTime.now());
        memo.setUpdatedAt(LocalDateTime.now());
        return memoRepository.save(memo);
    }

    public Memo updateMemo(Integer id, Memo memoDetails) {
        return memoRepository.findById(id).map(memo -> {
            memo.setTitle(memoDetails.getTitle());
            memo.setContent(memoDetails.getContent());
            memo.setUpdatedAt(LocalDateTime.now());
            return memoRepository.save(memo);
        }).orElseThrow(() -> new RuntimeException("Memo not found with id " + id));
    }

    public void deleteMemo(Integer id) {
        memoRepository.deleteById(id);
    }
}