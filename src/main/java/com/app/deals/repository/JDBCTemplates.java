package com.app.deals.repository;

import com.app.deals.vo.DealVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class JDBCTemplates {

    @Autowired
    private JdbcTemplate jdbc;

    public static final String QUERY = "select du.stage_to as stage, count(*) as totalInStages from deals d inner join deals_updates du on d.deal_id = du.deal_id where year(du.update_date) = 2017 and week(du.update_date) between ? and ? and (select count(*) from deals_updates where year(update_date) = 2017 and deal_id = d.deal_id and week(deals_updates.update_date) between ? and ?) = 1 group by du.stage_to";

    public List<DealVO> dealsNotMoved(int initial, int end) {
        List<DealVO> deals = jdbc.query(
                QUERY, new BeanPropertyRowMapper<DealVO>(DealVO.class), initial, end, initial, end
        );
        return deals;
    }

}
