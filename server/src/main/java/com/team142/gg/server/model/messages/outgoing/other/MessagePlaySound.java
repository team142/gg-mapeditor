/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.model.messages.outgoing.other;

import com.team142.gg.server.model.messages.base.ConversationType;
import com.team142.gg.server.model.messages.base.Message;
import com.team142.gg.server.model.messages.base.SoundType;
import lombok.Getter;

/**
 * @author just1689
 */
public class MessagePlaySound extends Message {

    @Getter
    private final String FILE;

    public MessagePlaySound(SoundType type) {
        setConversation(ConversationType.S_PLAY_SOUND.name());
        this.FILE = type.getFILE();

    }

}
