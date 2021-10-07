// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PDOMUtils from '../../../../scenery/js/accessibility/pdom/PDOMUtils.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Easing from '../../../../twixt/js/Easing.js';
import TransitionNode from '../../../../twixt/js/TransitionNode.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayNumberAndStar from '../../../../vegas/js/ScoreDisplayNumberAndStar.js';
import TestGameConstants from '../../common/TestGameConstants.js';
import testGame from '../../testGame.js';
import testGameStrings from '../../testGameStrings.js';
import TestGameModel from '../model/TestGameModel.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TestGameLevelNode from './TestGameLevelNode.js';

// constants
const TRANSITION_OPTIONS = {
  duration: 0.5, // sec
  targetOptions: {
    easing: Easing.QUADRATIC_IN_OUT
  }
};

class TestGameScreenView extends ScreenView {

  /**
   * @param {TestGameModel} model
   */
  constructor( model ) {
    assert && assert( model instanceof TestGameModel, 'invalid model' );

    super();

    // To improve readability
    const layoutBounds = this.layoutBounds;

    // a level-selection button for each level
    const levelSelectionButtons = model.levels.map(
      level => new LevelSelectionButton( new Text( testGameStrings[ level.levelNumber ].level ), level.scoreProperty, {
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
    this.addChild( buttonsBox );

    // @private
    this.levelSelectionButtons = levelSelectionButtons;

    this.levelNodes = model.levels.map( level => new TestGameLevelNode( level, model.levelProperty, layoutBounds ) );

    // @private Handles the animated 'slide' transition between levelSelectionNode and a level.
    this.transitionNode = new TransitionNode( this.visibleBoundsProperty, {
      cachedNodes: [ ...this.levelNodes ]
    } );

    // Transition between levelSelectionNode and the selected level.
    // A null value for levelProperty indicates that no level is selected, and levelSelectionNode should be shown.
    model.levelProperty.lazyLink( ( level, previousLevel ) => {

      this.interruptSubtreeInput();

      if ( level ) {

        // Transition to the selected level.
        const selectedLevelNode = _.find( this.levelNodes, levelNode => ( levelNode.level === level ) );
        const transition = this.transitionNode.slideLeftTo( selectedLevelNode, TRANSITION_OPTIONS );

        // Set focus to the first focusable element in selectedLevelNode.
        // See specification at https://github.com/phetsims/vegas/issues/90#issuecomment-854034816
        const transitionEndedListener = () => {
          assert && assert( this.transitionNode.hasChild( selectedLevelNode ) && selectedLevelNode.visible );

          // This is a little brittle. If anything else is added to the screen in the future that is
          // not associated with transitionNode, then it might get the focus.
          PDOMUtils.getFirstFocusable().focus();
          transition.endedEmitter.removeListener( transitionEndedListener );
        };
        transition.endedEmitter.addListener( transitionEndedListener );
      }
      else {
        // Selected level was null, so stay here on this screen??
      }
    } );

    this.addChild( this.transitionNode );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: layoutBounds.maxX - TestGameConstants.SCREEN_VIEW_X_MARGIN,
      bottom: layoutBounds.maxY - TestGameConstants.SCREEN_VIEW_Y_MARGIN
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