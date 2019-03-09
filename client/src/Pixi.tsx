import React, {Component} from "react";
import * as PIXI from "pixi.js";
import "pixi-picture";
import "pixi-projection";
import "pixi-layers";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {PhotoCamera} from "@material-ui/icons";


export interface IPixiProps {
}

class Pixi extends Component<IPixiProps> {
    pixi_cnt: HTMLDivElement | null = null;
    app: PIXI.Application;

    constructor(props: IPixiProps) {
        super(props);

        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            transparent: false
        });
    }

    updatePixiCnt = (element: HTMLDivElement) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;
        //now we are adding the application to the DOM element which we got from the Ref.
        if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
            this.pixi_cnt.appendChild(this.app.view);
            //The setup function is a custom function that we created to add the sprites. We will this below
            this.setup();
        }
    };

    download = (element: HTMLAnchorElement) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        element.setAttribute('download', 'MyWedding.png');
        element.setAttribute('href',
            (this.app.view as any).toDataURL("image/png").replace("image/png", "image/octet-stream"));
        //link.click();
    };

    setup() {

        // customize default values of PixiConsole
        /*const consoleConfig = new PixiConsoleConfig();
        consoleConfig.consoleWidth = 800;
        consoleConfig.consoleHeight = 600;
        this.app.stage.addChild(new PixiConsole(consoleConfig));
        */
        this.app.stage = new PIXI.display.Stage();

        // create a new background sprite
        var background = PIXI.Sprite.fromImage(
            process.env.PUBLIC_URL + "/assets/bg02.jpg"
        );
        background.width = 800;
        background.height = 600;
        this.app.stage.addChild(background);


        var ms = new PIXI.projection.Sprite2d(PIXI.Texture.fromImage(
            process.env.PUBLIC_URL + '/assets/ms02.png'));
        ms.anchor.set(0.5, 1.0);
        ms.proj.affine = PIXI.projection.AFFINE.AXIS_X; // return to affine after rotating
        ms.position.set(this.app.screen.width * 1 / 2, this.app.screen.height / 2 + 120);
        this.app.stage.addChild(ms);

        // create
        var u1 = new PIXI.projection.Sprite2d(PIXI.Texture.fromImage(
            'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png'));
        u1.anchor.set(0.5, 1.0);
        u1.proj.affine = PIXI.projection.AFFINE.AXIS_X; // return to affine after rotating
        u1.position.set(this.app.screen.width * 1 / 2 + 100, this.app.screen.height / 2 + 120);
        u1.scale.set(0.1);
        this.app.stage.addChild(u1);

        /*var step = 0;
        this.app.ticker.add((delta) => {
            step += delta;
            u1.rotation = step * 0.1;
            //u1.rotation = Math.round(step)%2 == 0 ? 1.0 * 0.1 : 0.0 * 0.1;
        });*/

        var u2 = new PIXI.projection.Sprite2d(PIXI.Texture.fromImage(
            'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1000000.png'));
        u2.anchor.set(0.5, 1.0);
        u2.proj.affine = PIXI.projection.AFFINE.AXIS_X; // return to affine after rotating
        u2.position.set(this.app.screen.width * 1 / 2 - 100, this.app.screen.height / 2 + 120);
        u2.scale.set(0.1);
        this.app.stage.addChild(u2);

        //speed up the process, because OVERLAY and HARD_LIGHT will use copyTex instead of readPixels
        this.app.stage.filters = [new PIXI.filters.AlphaFilter()];
        this.app.stage.filterArea = this.app.screen;

        // z-index = 0, sorting = true;
        var greenGroup = new PIXI.display.Group(0, true);
        greenGroup.on('sort', function (sprite: any) {
            //green bunnies go down
            sprite.zOrder = -sprite.y;
        });

        var dragGroup = new PIXI.display.Group(2, false);
        var shadowGroup = new PIXI.display.Group(-1, false);
        //specify display list component

        //sorry, group cant exist without layer yet :(
        this.app.stage.addChild(new PIXI.display.Layer(greenGroup));
        this.app.stage.addChild(new PIXI.display.Layer(dragGroup));
        this.app.stage.addChild(new PIXI.display.Layer(shadowGroup));

        var blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 0.5;

        var guestsContainer = new PIXI.Container();
        this.app.stage.addChild(guestsContainer);

        // create an array to store a reference to the guests
        var guestsArray: PIXI.Sprite[] = [];
        var guests = [
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1149319.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1408319.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1407319.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1111111.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1111110.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1300309.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1410109.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1300109.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1200109.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1411119.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1200000.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1200001.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1000000.png",
            "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png"
        ];


        for (var i = 0; i < guests.length; i++) {

            var texture = PIXI.Texture.fromImage(guests[i]);
            // create a new Sprite that uses the image name that we just generated as its source
            var guest = new PIXI.Sprite(texture);
            // setting renderer plugin 'picture', from pixi-picture
            guest.pluginName = "picture";

            guest.anchor.set(0.5);
            guest.parentGroup = greenGroup;
            (guest as any).dragGroup = dragGroup;
            // set a random scale for the dude
            guest.scale.set(0.1);

            // finally let's set the dude to be at a random position...
            guest.x = Math.floor(Math.random() * this.app.screen.width);
            guest.y = Math.floor((Math.random() * (this.app.screen.height / 2 - 100)) + this.app.screen.height / 2 + 120);

            var ry = Math.random() * 200 - 100
            console.log(ry);
            (guest as any).my = ry;
            // The important bit of this example, this is how you change the default blend mode of the sprite
            /*guest.blendMode =
                Math.random() > 0.5
                    ? PIXI.BLEND_MODES.OVERLAY
                    : PIXI.BLEND_MODES.HARD_LIGHT;*/

            // create some extra properties that will control movement
            (guest as any).direction = Math.random() * Math.PI * 2;

            (guest as any).jump = (guest as any).my >= 0.0;

            // this number will be used to modify the direction of the dude over time
            (guest as any).turningSpeed = Math.random() - 0.8;

            // create a random speed for the dude between 0 - 2
            (guest as any).speed = 2 + Math.random() * 2;

            // finally we push the dude into the dudeArray so it it can be easily accessed later
            guestsArray.push(guest);
            this.addInteraction(guest);
            //this.app.stage.addChild(guest);
            guestsContainer.addChild(guest);
        }

        /*
            // create an array to store a reference to the dudes
            var dudeArray: PIXI.Sprite[] = [];

            var totaldudes = 20;
            //var texture = PIXI.Texture.fromImage('flowerTop.png');
            var texture = PIXI.Texture.fromImage(
              "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1439319.png"
            );
            for (var i = 0; i < totaldudes; i++) {
              // create a new Sprite that uses the image name that we just generated as its source
              var dude = new PIXI.Sprite(texture);
              // setting renderer plugin 'picture', from pixi-picture
              dude.pluginName = "picture";

              dude.anchor.set(0.5);

              // set a random scale for the dude
              dude.scale.set(0.2);

              // finally let's set the dude to be at a random position...
              dude.x = Math.floor(Math.random() * this.app.screen.width);
              dude.y = Math.floor(Math.random() * this.app.screen.height);

              // The important bit of this example, this is how you change the default blend mode of the sprite
              dude.blendMode =
                Math.random() > 0.5
                  ? PIXI.BLEND_MODES.OVERLAY
                  : PIXI.BLEND_MODES.HARD_LIGHT;

              // create some extra properties that will control movement
              (dude as any).direction = Math.random() * Math.PI * 2;

              // this number will be used to modify the direction of the dude over time
              (dude as any).turningSpeed = Math.random() - 0.8;

              // create a random speed for the dude between 0 - 2
              (dude as any).speed = 2 + Math.random() * 2;

              // finally we push the dude into the dudeArray so it it can be easily accessed later
              dudeArray.push(dude);

              this.app.stage.addChild(dude);
            }

            // create a bounding box box for the little dudes
            var dudeBoundsPadding = 100;

            var dudeBounds = new PIXI.Rectangle(
              -dudeBoundsPadding,
              -dudeBoundsPadding,
              this.app.screen.width + dudeBoundsPadding * 2,
              this.app.screen.height + dudeBoundsPadding * 2
            );

            var tick = 0;

            this.app.ticker.add(function() {
              // iterate through the dudes and update the positions
              for (var i = 0; i < dudeArray.length; i++) {
                var dude = dudeArray[i];
                (dude as any).direction += (dude as any).turningSpeed * 0.01;
                dude.x += Math.sin((dude as any).direction) * (dude as any).speed;
                dude.y += Math.cos((dude as any).direction) * (dude as any).speed;
                dude.rotation = -(dude as any).direction - Math.PI / 2;

                // wrap the dudes by testing their bounds...
                if (dude.x < dudeBounds.x) {
                  dude.x += dudeBounds.width;
                } else if (dude.x > dudeBounds.x + dudeBounds.width) {
                  dude.x -= dudeBounds.width;
                }

                if (dude.y < dudeBounds.y) {
                  dude.y += dudeBounds.height;
                } else if (dude.y > dudeBounds.y + dudeBounds.height) {
                  dude.y -= dudeBounds.height;
                }
              }

              // increment the ticker
              tick += 0.1;
            });
            */


        var tick = 0;

        this.app.ticker.add(function () {
            // iterate through the dudes and update the positions
            for (var i = 0; i < guestsArray.length; i++) {
                var dude = guestsArray[i];
                if ((dude as any).jump) {
                    dude.y += 0.1;
                    (dude as any).my += 0.1;
                    if ((dude as any).my >= 20) {
                        (dude as any).jump = false;
                        (dude as any).my = 0;
                    }
                } else {
                    dude.y -= 0.1;
                    (dude as any).my += 0.1;
                    if ((dude as any).my >= 20) {
                        (dude as any).jump = true;
                        (dude as any).my = 0;
                    }
                }
            }
            // increment the ticker
            tick += 0.1;
        });

    }

    // === INTERACTION CODE  ===

    addInteraction(obj: any) {
        obj.interactive = true;
        obj
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(event: any) {
        var obj = event.currentTarget;
        obj.dragData = event.data;
        obj.dragging = 1;
        obj.oldGroup = obj.parentGroup;
        obj.parentGroup = obj.dragGroup;
        obj.dragPointerStart = event.data.getLocalPosition(obj.parent);
        obj.dragObjStart = new PIXI.Point();
        obj.dragObjStart.copy(obj.position);
        obj.dragGlobalStart = new PIXI.Point();
        obj.dragGlobalStart.copy(event.data.global);
        event.stopPropagation();
    }


    onDragEnd(event: any) {
        var obj = event.currentTarget;
        if (!obj.dragging) return;
        if (obj.dragging == 1) {
            //toggle(obj);
        } else {
            //snap(obj);
        }

        obj.dragging = 0;
        obj.dragData = null;
        obj.parentGroup = obj.oldGroup;

        event.stopPropagation();
        // set the interaction data to null
    }

    onDragMove(event: any) {
        var obj = event.currentTarget;
        if (!obj.dragging) return;
        event.stopPropagation();
        var data = obj.dragData; // it can be different pointer!
        if (obj.dragging == 1) {
            // click or drag?
            if (Math.abs(data.global.x - obj.dragGlobalStart.x) +
                Math.abs(data.global.y - obj.dragGlobalStart.y) >= 3) {
                // DRAG
                obj.dragging = 2;
            }
        }
        if (obj.dragging == 2) {
            var dragPointerEnd = data.getLocalPosition(obj.parent);
            // DRAG
            obj.position.set(
                obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
                obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
            );
        }
    }

    render() {
        return (<div>
            <div ref={this.updatePixiCnt}/>
            <a id="link">
                <IconButton color="primary" component="span">
                    <PhotoCamera/>
                </IconButton>
            </a>
        </div>);
    }
}

export default Pixi;
