/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.workers.base;

import com.team142.gg.server.controller.Referee;
import com.team142.gg.server.model.Game;
import com.team142.gg.server.model.Server;
import com.team142.gg.server.workers.GameTicker;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author just1689
 */
public abstract class AbstractTickerWorker implements Runnable {

    private final Game GAME;
    private final AtomicBoolean RUNNING = new AtomicBoolean(true);
    private long nextSleepTimeMs;

    public AbstractTickerWorker(Game GAME) {
        this.GAME = GAME;
    }

    public void stopNow() {
        RUNNING.set(false);
    }

    @Override
    public void run() {
        while (RUNNING.get()) {
            long startTime = System.currentTimeMillis();

            //Move things
            moveThings();

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            if (duration < Server.TICK_MS) {
                nextSleepTimeMs = Server.TICK_MS - duration;
                nap();
            } else if (duration > Server.TICK_MS) {
                Logger.getLogger(Referee.class.getName()).log(Level.WARNING, "Game ticker took long! Time taken: {0} ms", duration);
            }
        }
    }

    private void moveThings() {
        //TODO: implement

        try {
            Thread.sleep(20); //Meh
        } catch (InterruptedException ex) {
            Logger.getLogger(GameTicker.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void nap() {
        try {
            Thread.sleep(nextSleepTimeMs);
        } catch (InterruptedException ex) {
            Logger.getLogger(GameTicker.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
