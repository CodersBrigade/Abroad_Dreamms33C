package com.adreams.abroad_dreams_back.enums;

public enum BookingEnum {
    PENDING("pending"),PROCESSING("processing"),CANCEL("cancel"),COMPLETED("completed");
    private String value;

    BookingEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
