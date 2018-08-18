package com.app.deals.repository;

import com.app.deals.domain.Deal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface DealRepository extends Repository<Deal, String> {

    @Query(
            value = "select * from deals inner join deals_updates ups on deals.deal_id = ups.deal_id where year(ups.update_date) = '2017' and week(ups.update_date) between ?1 and ?2 and ups.stage_to = ?3",
            nativeQuery = true
    )
    List<Deal> findDeals(int initial, int end, String stage);

}
