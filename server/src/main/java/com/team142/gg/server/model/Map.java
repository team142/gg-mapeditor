/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.model;

import com.team142.gg.server.model.mappable.organic.MapTileElement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.Data;

/**
 *
 * @author just1689
 */
@Data
public class Map {

    private final List<MapTileElement> TILES;
    private boolean[][][] bitmap;
    private int x, z;

    public Map(int x, int z) {
        this.TILES = Collections.synchronizedList(new ArrayList<>());
        this.x = x;
        this.z = z;
        setBitmap(new boolean[x][z][2]);
    }

    public void setTileBitmapMovable(int x, int y, boolean val) {
        this.bitmap[x][y][0] = val;
    }

    public void setTileBitmapShootover(int x, int y, boolean val) {
        this.bitmap[x][y][1] = val;
    }

    public boolean isMovable(int x, int y) {
        if (x >= this.x || x <= 0 || y >= this.z || y < 0) {
            return false;
        }
        return this.bitmap[x][y][0];
    }

    public boolean isShootover(int x, int y) {
        if (x >= this.x || x <= 0 || y >= this.z || y < 0) {
            return false;
        }
        return this.bitmap[x][y][1];
    }

    public boolean isMovable(double x, double y) {
        return isMovable((int) x, (int) y);
    }

    public boolean isShootover(double x, double y) {
        return isShootover((int) x, (int) y);
    }

}