// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import Screen from '../../../joist/js/Screen.js';
import testGameColors from '../common/TestGameColors.js';
import testGame from '../testGame.js';
import TestGameModel from './model/TestGameModel.js';
import TestGameScreenView from './view/TestGameScreenView.js';

class TestGameScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      //TODO if you include homeScreenIcon or navigationBarIcon, use JOIST/ScreenIcon
      backgroundColorProperty: testGameColors.screenBackgroundColorProperty,
      tandem: tandem
    };

    super(
      () => new TestGameModel( tandem.createTandem( 'model' ) ),
      model => new TestGameScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

testGame.register( 'TestGameScreen', TestGameScreen );
export default TestGameScreen;