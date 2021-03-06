import {baby} from '../model/Baby.js'
import {PowerCooldownBar} from '../model/PowerCooldownBar.js'
import {BabylonUtils} from './BabylonUtils.js'
import {match} from '../model/Match.js'
import {passiveIconInfo, powerIconInfo} from '../model/Power.js'
import {TEXTURES_DIR} from './BabylonTextures.js'

const BLOCK_SIZE = 5

/*
    This class is specifically for create / edit Babylon UI components
*/
export class BabylonUI {


    static changeMyHealthBar(health, maxHealth) {
        if (!match.healthBar) {
            return
        }

        let potentialWidth = 8 * 80
        let actualWidth = health / maxHealth * potentialWidth
        let di = potentialWidth - actualWidth

        match.healthBar.width = actualWidth + "px"
        match.healthBar.left = 0 - (di / 2)
    }

    static setHealth(t) {
        if (match.tag === t.tag) {
            BabylonUI.changeMyHealthBar(t.health, t.maxHealth)
        }

        const rect1 = match.getHealthBarByTag(t.tag)
        if (rect1) {
            BabylonUI.setHealthRectangle(rect1, t.health, t.maxHealth)
        }

    }

    static setHealthRectangle(rect1, health, totalHealth) {
        rect1.width = health / totalHealth * 0.2
        if (match.miniMapOn !== rect1.isVisible) {
            rect1.isVisible = match.miniMapOn
        }

    }

    static displayScores() {
        baby.textScores.forEach(ro => {
            ro.dispose()
        })
        match.scores.forEach((row, i) => {
            BabylonUI.createRightText(i, row.key, row.value)
        })

    }

    static scoreboard(obj) {

        Object.keys(obj.tags)
            .forEach(key => BabylonUtils.createSphereIfNotExists(obj.tags[key], key))

        match.scores = []

        Object.keys(obj.scores)
            .forEach(key => match.scores.push(
                {
                    key: key,
                    value: obj.scores[key]
                }
            ))
        match.scores.sort((a, b) => a.value - b.value)
        BabylonUI.displayScores()

    }

    static createGui() {
        baby.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
        baby.panelScores = new BABYLON.GUI.StackPanel()
        baby.panelScores.width = "220px"
        baby.panelScores.height = "200px"
        baby.panelScores.fontSize = "14px"
        baby.panelScores.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        baby.panelScores.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
        baby.advancedTexture.addControl(baby.panelScores)

    }

    static createTopPowerBar() {

        let powerBack = new BABYLON.GUI.Rectangle();
        let w = 10 * 80 + 10
        powerBack.width = w + "px"
        powerBack.height = "95px"
        powerBack.cornerRadius = 20
        powerBack.color = "Black"
        powerBack.thickness = 4
        powerBack.background = "Black"
        powerBack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        powerBack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP
        baby.advancedTexture.addControl(powerBack)

        passiveIconInfo
            .filter(p => p.usable)
            .forEach(p => {
                BabylonUI.createTopPowerBarItem(p.key, p.ico)
                PowerCooldownBar.set(
                    (p.key),
                    new PowerCooldownBar(BabylonUI.createPowerBarCooldownTile(p.id - 1, BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP), p.cooldown)
                )
            })
    }


    static createBotPowerBar() {

        let powerBack = new BABYLON.GUI.Rectangle();
        let w = 10 * 80 + 10
        powerBack.width = w + "px"
        powerBack.height = "95px"
        powerBack.cornerRadius = 20
        powerBack.color = "White"
        powerBack.thickness = 4
        powerBack.background = "Black"
        powerBack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        powerBack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        baby.advancedTexture.addControl(powerBack)


        powerIconInfo
            .filter(p => p.usable)
            .forEach(p => {
                BabylonUI.createBotPowerBarItem(p.powerNumber - 1, p.ico, p.key)
                PowerCooldownBar.set(
                    (p.powerNumber).toString(),
                    new PowerCooldownBar(BabylonUI.createPowerBarCooldownTile(p.powerNumber - 1, BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM), p.cooldown)
                )
            })

    }

    static createPowerBarCooldownTile(n, vAlign) {
        let image = new BABYLON.GUI.Image("cooldownTile" + n, TEXTURES_DIR + "ico-blank.jpg")
        image.height = "75px"
        image.width = "75px"
        image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        image.verticalAlignment = vAlign

        //Left position
        let x = (75 + 5) * +n //Defaul space for a tile
        x = x - ((75 + 5) * (10 / 2 - 0.5)) //Center in middle
        image.left = x + "px"
        image.top = "-10px"

        baby.advancedTexture.addControl(image)
        return image
    }

    static createBotPowerBarItem(n, fileImage, key, level = 1) {

        let image = new BABYLON.GUI.Image("powerBot" + n, fileImage)
        image.height = "75px"
        image.width = "75px"
        image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

        //Left position
        let x = (75 + 5) * +n //Defaul space for a tile
        x = x - ((75 + 5) * (10 / 2 - 0.5)) //Center in middle
        image.left = x + "px"
        image.top = "-10px"
        baby.advancedTexture.addControl(image)

        const text1 = new BABYLON.GUI.TextBlock("textblock" + n)
        text1.text = key
        text1.color = "white"
        text1.fontSize = 24

        text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

        text1.left = (x - 75 / 2 + 7) + "px"
        text1.top = "-10px"
        baby.advancedTexture.addControl(text1)


        const text2 = new BABYLON.GUI.TextBlock("textblockLevel" + n)
        text2.text = (+level).toString()
        text2.color = "white"
        text2.fontSize = 24

        text2.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        text2.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

        text2.left = (x - 75 / 2 + 7) + "px"
        text2.top = "-58px"
        baby.advancedTexture.addControl(text2)
        baby.levelLabels.set(key, text2)


    }


    static createTopPowerBarItem(n, fileImage) {

        let image = new BABYLON.GUI.Image("powerBot" + n, fileImage)
        image.height = "75px"
        image.width = "75px"
        image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP

        //Left position
        let x = (75 + 5) * +n //Defaul space for a tile
        x = x - ((75 + 5) * (10 / 2 - 0.5)) //Center in middle
        image.left = x + "px"
        image.top = "-10px"
        baby.advancedTexture.addControl(image)

        var text1 = new BABYLON.GUI.TextBlock("textblock" + n)
        text1.text = n
        text1.color = "black"
        text1.fontSize = 24

        text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP

        text1.left = (x - 75 / 2 + 7) + "px"
        text1.top = "-10px"
        baby.advancedTexture.addControl(text1)

    }

    static createOwnHealthBar() {
        let w = 8 * 80

        let healthBarRed = new BABYLON.GUI.Rectangle();
        healthBarRed.width = w + "px"
        healthBarRed.height = "10px"
        healthBarRed.top = "-95px"
        healthBarRed.cornerRadius = 20
        healthBarRed.color = "Red"
        healthBarRed.thickness = 1
        healthBarRed.background = "Red"
        healthBarRed.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        healthBarRed.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        baby.advancedTexture.addControl(healthBarRed)

        let healthBarGreen = new BABYLON.GUI.Rectangle();
        healthBarGreen.width = (w) + "px"
        healthBarGreen.height = "10px"
        healthBarGreen.top = "-95px"
        healthBarGreen.cornerRadius = 20
        healthBarGreen.color = "Green"
        healthBarGreen.thickness = 1
        healthBarGreen.background = "Green"
        healthBarGreen.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        healthBarGreen.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        baby.advancedTexture.addControl(healthBarGreen)

        match.healthBar = healthBarGreen

    }

    static createRightText(num, name, score) {
        const current = BABYLON.GUI.Button.CreateSimpleButton("but" + BabylonUtils.getCounter(), name + ": " + score)
        current.width = 1
        current.height = "50px"
        current.color = "white"
        current.background = "black"
        baby.panelScores.addControl(current)
        baby.textScores.push(current)

    }

    static createRadar(obj) {
        BabylonUI.stopRadar()
        obj.things.forEach(thing => BabylonUI.createTinyBlockFromThing(thing))
    }

    static createTinyBlockFromThing(thing) {
        if (thing.tag === match.tag) {
            BabylonUI.createTinyBlock(thing.point.x, thing.point.z, "blue")
        } else {
            BabylonUI.createTinyBlock(thing.point.x, thing.point.z, "red")
        }
    }

    static createTinyBlock(x, y, color) {
        const tinyBlock = new BABYLON.GUI.Rectangle();
        tinyBlock.width = BLOCK_SIZE + "px"
        tinyBlock.height = BLOCK_SIZE + "px"
        tinyBlock.color = color
        tinyBlock.left = (BLOCK_SIZE * x) + "px"
        tinyBlock.top = (BLOCK_SIZE * y) + "px"
        tinyBlock.background = color
        tinyBlock.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        tinyBlock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
        baby.advancedTexture.addControl(tinyBlock)
        baby.radar.push(tinyBlock)
    }

    static stopRadar() {
        baby.radar.forEach(item => item.dispose())
        baby.radar = []
    }

    static setPowerLabelLevel(key, level) {
        const textLabel = baby.levelLabels.get(key)
        textLabel.text = (+level).toString()
    }


}