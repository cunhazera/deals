package com.app.deals;

import com.app.deals.domain.Deal;
import com.app.deals.repository.DealRepository;
import com.app.deals.repository.JDBCTemplates;
import com.app.deals.vo.DealVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealService {

    @Autowired
    private DealRepository repository;

    @Autowired
    private JDBCTemplates jdbc;

    public List<Deal> findDeals(int initial, int end, String stage) {
        return repository.findDeals(initial, end, stage);
    }

    public List<DealVO> dealsNotMovedInPeriod(int initial, int end) {
        return jdbc.dealsNotMoved(initial, end);
    }

}
