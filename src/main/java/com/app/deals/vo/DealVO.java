package com.app.deals.vo;

public class DealVO {

    public DealVO(String stage, Integer total) {

    }

    public DealVO() {

    }

    private String stage;
    private Integer totalInStages;

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public Integer getTotalInStages() {
        return totalInStages;
    }

    public void setTotalInStages(Integer totalInStages) {
        this.totalInStages = totalInStages;
    }
}
