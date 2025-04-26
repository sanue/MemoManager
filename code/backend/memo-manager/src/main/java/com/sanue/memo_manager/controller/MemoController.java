package com.sanue.memo_manager.controller;

import com.sanue.memo_manager.entity.Memo;
import com.sanue.memo_manager.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memos")
public class MemoController {

    @Autowired
    private MemoService memoService;

    @GetMapping
    public List<Memo> getAllMemos() {
        return memoService.getAllMemos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Memo> getMemoById(@PathVariable Integer id) {
        return memoService.getMemoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Memo createMemo(@RequestBody Memo memo) {
        return memoService.createMemo(memo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Memo> updateMemo(@PathVariable Integer id, @RequestBody Memo memoDetails) {
        try {
            return ResponseEntity.ok(memoService.updateMemo(id, memoDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemo(@PathVariable Integer id) {
        memoService.deleteMemo(id);
        return ResponseEntity.noContent().build();
    }
}