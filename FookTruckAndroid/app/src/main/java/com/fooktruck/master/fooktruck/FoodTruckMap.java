package com.fooktruck.master.fooktruck;

<<<<<<< HEAD
import android.content.pm.PackageManager;
=======
import android.*;
import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
>>>>>>> master
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class FoodTruckMap extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private String fine  = Manifest.permission.ACCESS_FINE_LOCATION;
    private String coarse = Manifest.permission.ACCESS_COARSE_LOCATION;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_food_truck_map);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        verifyPermissions(this);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);


    }

    public void verifyPermissions(Activity activity) {
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION);
        String [] permissions = {fine, coarse};
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    permissions,
                    1
            );
        }
    }
    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mMap.setMyLocationEnabled(true);
        mMap.setMinZoomPreference(11);
        // Add a marker in Sydney and move the camera
        LatLng num1 = new LatLng(39.299236, -76.609383);
        LatLng num2 = new LatLng(39.249236, -76.609383);
        LatLng num3 = new LatLng(39.299236, -76.559383);
        LatLng num4 = new LatLng(39.298336,-76.568383);

        mMap.addMarker(new MarkerOptions().position(num1).title("Center").snippet("Hello")
                .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_marker_logo)));
        mMap.addMarker(new MarkerOptions().position(num2).title("Foo Place").snippet("1234 Foo Drive")
        .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_marker_logo)));
        mMap.addMarker(new MarkerOptions().position(num3).title("Foo Place").snippet("1234 Foo Drive")
                .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_marker_logo)));
        mMap.addMarker(new MarkerOptions().position(num4).title("Foo Place").snippet("1234 Foo Drive")
                .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_marker_logo)));

        mMap.moveCamera(CameraUpdateFactory.newLatLng(num1));
    }


}
