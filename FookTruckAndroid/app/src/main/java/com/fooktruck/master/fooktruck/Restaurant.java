package com.fooktruck.master.fooktruck;

import java.util.ArrayList;

/**
 * Created by MASTER on 10/15/16.
 */
public class Restaurant {
    private String name;
    private String email;
    private String cuisine;
    private String hours;
    private boolean isOpen
    private String lat;
    private String lng;
    private ArrayList<String> menus;

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public void setMenus(ArrayList<String> menus) {
        this.menus = menus;
    }

    public String getName() {

        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCuisine() {
        return cuisine;
    }

    public String getHours() {
        return hours;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public String getLat() {
        return lat;
    }

    public String getLng() {
        return lng;
    }

    public ArrayList<String> getMenus() {
        return menus;
    }

    public Restaurant(String name, String email, String cuisine, String hours, boolean isOpen, String lat, String lng, ArrayList<String> menus) {

        this.name = name;
        this.email = email;
        this.cuisine = cuisine;
        this.hours = hours;
        this.isOpen = isOpen;
        this.lat = lat;
        this.lng = lng;
        this.menus = menus;
    }
}
