/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.model.mappable;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author just1689
 */
public class MapTileElement extends PlaceableElement {

    @Getter
    @Setter
    private String model;

    public MapTileElement(double x, double y, double z, String skin, BigDecimal rotation, String model) {
        super(x, y, z, rotation, skin, 0);
        this.model = model;

    }

}
