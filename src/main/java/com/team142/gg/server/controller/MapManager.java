/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.controller;

import com.team142.gg.server.model.mappable.organic.MapSettings;
import com.team142.gg.server.model.mappable.organic.ModelType;
import com.team142.gg.server.model.mappable.organic.SkinType;
import com.team142.gg.server.model.mappable.organic.Tile;
import com.team142.gg.server.model.Game;
import com.team142.gg.server.model.Map;
import com.team142.gg.server.model.mappable.meta.DirectionTypes;
import com.team142.gg.server.model.mappable.organic.MapTileElement;

/**
 *
 * @author just1689
 */
public class MapManager {

    public static void generateMap(MapSettings settings, Game game) {
        //TODO

        Tile waterTile = new Tile(SkinType.WATER, ModelType.FLAT_TILE, false, false);
        Tile grassTile = new Tile(SkinType.GRASS, ModelType.FLAT_TILE, true, false);
        Tile rockTile = new Tile(SkinType.ROCK, ModelType.ROCK_TILE, false, true);

        game.setMap(new Map(settings.getXTiles(), settings.getZTiles()));

        //Green map for now
        for (int x = 0; x < settings.getXTiles(); x++) {
            for (int y = 0; y < settings.getZTiles(); y++) {
                if (x > 20 && x < 30 && y > 20 && y < 30) {
                    MapTileElement tile = new MapTileElement(x, 1, y, rockTile, DirectionTypes.DIR0);
                    game.getMap().getTILES().add(tile);
                    game.getMap().setTileBitmapMovable(x, y, false);
                    game.getMap().setTileBitmapShootover(x, y, false);
                } else if (x == 49 || y == 49 || x == 0 || y == 0) {
                    MapTileElement tile = new MapTileElement(x, 1, y, waterTile, DirectionTypes.DIR0);
                    game.getMap().getTILES().add(tile);
                    game.getMap().setTileBitmapMovable(x, y, false);
                    game.getMap().setTileBitmapShootover(x, y, true);
                } else {
                    MapTileElement tile = new MapTileElement(x, 1, y, grassTile, DirectionTypes.DIR0);
                    game.getMap().getTILES().add(tile);
                    game.getMap().setTileBitmapMovable(x, y, true);
                    game.getMap().setTileBitmapShootover(x, y, true);
                }
            }
        }

    }

}
