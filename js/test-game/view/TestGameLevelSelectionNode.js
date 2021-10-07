// Copyright 2021, University of Colorado Boulder

/**
 * WaveGameLevelSelectionNode is the user interface for level selection and other game settings in the 'Wave Game'
 * screen. It displays a set of level-selection buttons, an Info button for opening a dialog that describes the levels,
 * and a ResetAllButton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import TestGameConstants from '../../common/TestGameConstants.js';
import testGame from '../../testGame.js';
import testGameStrings from '../../testGameStrings.js';
import TestGameLevel from '../model/TestGameLevel.js';

class TestGameLevelSelectionNode extends Node {

  /**
   * @param {TestGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {Object} [options]
   */
  constructor( model, layoutBounds, options ) {

    options = merge( {

      // TestGameLevelSelectionNode options
      resetCallback: null // {function|null}

    }, options );

    // a level-selection button for each level
    const levelSelectionButtons = model.levels.map(
      level => new LevelSelectionButton( new Text(
        StringUtils.fillIn( testGameStrings.level, {
          levelNumber: level.levelNumber
        } )
      ), level.scoreProperty, {
        // LevelSelectionButton options
        scoreDisplayConstructor: ScoreDisplayNumberAndStar,
        listener: () => {
          model.levelProperty.value = level;
        }
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
    buttonsBox.center = layoutBounds.center;

    // Reset All button, at lower right
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        options.resetCallback && options.resetCallback();
      },
      right: layoutBounds.maxX - TestGameConstants.SCREEN_VIEW_X_MARGIN,
      bottom: layoutBounds.maxY - TestGameConstants.SCREEN_VIEW_Y_MARGIN
    } );

    options.children = [ buttonsBox, resetAllButton ];

    super( options );

    // @private
    this.levelSelectionButtons = levelSelectionButtons;

    // pdom - traversal order
    // See https://github.com/phetsims/fourier-making-waves/issues/53
    this.pdomOrder = [ buttonsBox, resetAllButton ];
  }

  /**
   * Gets the button associated with a specified level.
   * @param {TestGameLevel} level
   * @returns {LevelSelectionButton}
   * @public
   */
  getButtonForLevel( level ) {
    assert && assert( level instanceof TestGameLevel );
    return _.find( this.levelSelectionButtons, button => button.level === level );
  }
}

testGame.register( 'TestGameLevelSelectionNode', TestGameLevelSelectionNode );
export default TestGameLevelSelectionNode;