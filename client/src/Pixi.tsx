import React, { Component } from "react";
import * as PIXI from "pixi.js";
import "pixi-picture";

export interface IPixiProps {}

class Pixi extends Component<IPixiProps> {
  pixi_cnt: HTMLDivElement | null = null;
  app: PIXI.Application;

  constructor(props: IPixiProps) {
    super(props);

    this.app = new PIXI.Application({
      width: 600,
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

  setup() {
    // create a new background sprite
    var background = PIXI.Sprite.fromImage(
      process.env.PUBLIC_URL + "/bg_rotate.jpg"
    );
    background.width = 800;
    background.height = 600;
    this.app.stage.addChild(background);

    //speed up the process, because OVERLAY and HARD_LIGHT will use copyTex instead of readPixels
    this.app.stage.filters = [new PIXI.filters.AlphaFilter()];
    this.app.stage.filterArea = this.app.screen;

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
      dude.scale.set(0.1);

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
  }

  render() {
    return <div ref={this.updatePixiCnt} />;
  }
}

export default Pixi;
