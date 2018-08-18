package com.app.deals.resources;

import com.app.deals.DealService;
import com.app.deals.domain.Deal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class DealsResources {

    @Autowired
    private DealService service;

    @RequestMapping(value = "deals", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Deal> findDealsInStage(
            @RequestParam(name = "initial") int initial,
            @RequestParam(name = "end") int end,
            @RequestParam(name = "stage") String stage) {
        return new ResponseEntity(service.findDeals(initial, end, stage), HttpStatus.OK);
    }

    @RequestMapping(value = "deals/unmoved", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Deal> findDealsInStage(@RequestParam(name = "initial") int initial,
                                                 @RequestParam(name = "end") int end) {
        return new ResponseEntity(service.dealsNotMovedInPeriod(initial, end), HttpStatus.OK);
    }

}
