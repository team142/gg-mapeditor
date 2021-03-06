/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.model.messages.outgoing.rendered;

import com.team142.gg.server.model.Game;
import com.team142.gg.server.model.messages.base.ConversationType;
import com.team142.gg.server.model.messages.base.Message;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

/**
 * @author just1689
 */
public class MessageScoreboard extends Message {

    @Getter
    private final Map<String, Integer> scores = new HashMap<>();

    @Getter
    private final Map<String, Integer> tags = new HashMap<>();

    public MessageScoreboard(Game game) {
        this.setConversation(ConversationType.S_SCOREBOARD.name());
        game.getPlayers().forEach((player) -> player.populateScorebord(this));
    }

}
