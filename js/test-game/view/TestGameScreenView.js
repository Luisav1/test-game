// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import TestGameConstants from '../../common/TestGameConstants.js';
import testGame from '../../testGame.js';
import testGameStrings from '../../testGameStrings.js';
import TestGameModel from '../model/TestGameModel.js';
import Text from '../../../../scenery/js/nodes/Text.js';

class TestGameScreenView extends ScreenView {

  /**
   * @param {TestGameModel} model
   */
  constructor( model ) {
    assert && assert( model instanceof TestGameModel, 'invalid model' );

    super();

    // {WaveGameLevelSelectionButton[]} a level-selection button for each level
    const levelSelectionButtons = model.levels.map(
      level => new LevelSelectionButton( new Text( testGameStrings[ level.levelNumber ].level ), level.scoreProperty, {
        // LevelSelectionButton options
        scoreDisplayConstructor: ScoreDisplayNumberAndStar
      } )
    );

    // Lay out the level-selection buttons in a grid.
    const BUTTONS_PER_ROW = 3;
    const rows = [];
    let i = 0;
    while ( i < levelSelectionButtons.length ) {

      // Create a row of buttons.
      const hBoxChildren = [];
      for ( let j = 0; j < BUTTONS_PER_ROW && i < levelSelectionButtons.length; j++ ) {
        hBoxChildren.push( levelSelectionButtons[ i ] );
        i++;
      }
      rows.push( new HBox( {
        children: hBoxChildren,
        spacing: 40
      } ) );
    }
    const buttonsBox = new VBox( {
      children: rows,
      align: 'center',
      spacing: 30
    } );
    buttonsBox.center = this.layoutBounds.center;
    this.addChild( buttonsBox );

    // @private
    this.levelSelectionButtons = levelSelectionButtons;

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - TestGameConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - TestGameConstants.SCREEN_VIEW_Y_MARGIN
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   * @public
   */
  reset() {
    //TODO
  }

  /**
   * Steps the view.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    //TODO
  }
}

testGame.register( 'TestGameScreenView', TestGameScreenView );
export default TestGameScreenView;