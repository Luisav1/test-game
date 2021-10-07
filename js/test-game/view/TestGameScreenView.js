// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import PDOMUtils from '../../../../scenery/js/accessibility/pdom/PDOMUtils.js';
import Easing from '../../../../twixt/js/Easing.js';
import TransitionNode from '../../../../twixt/js/TransitionNode.js';
import testGame from '../../testGame.js';
import TestGameModel from '../model/TestGameModel.js';
import TestGameLevelNode from './TestGameLevelNode.js';
import TestGameLevelSelectionNode from './TestGameLevelSelectionNode.js';

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

    // UI for level selection and other game settings
    const levelSelectionNode = new TestGameLevelSelectionNode( model, layoutBounds, {
      resetCallback: () => {
        model.reset();
      }
    } );

    this.levelNodes = model.levels.map( level => new TestGameLevelNode( level, model.levelProperty, layoutBounds, this.visibleBoundsProperty ) );

    // @private Handles the animated 'slide' transition between levelSelectionNode and a level.
    this.transitionNode = new TransitionNode( this.visibleBoundsProperty, {
      content: levelSelectionNode,
      cachedNodes: [ levelSelectionNode, ...this.levelNodes ]
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

        // Selected level was null, so transition to levelSelectionNode.
        const transition = this.transitionNode.slideRightTo( levelSelectionNode, TRANSITION_OPTIONS );

        // Set focus to the level-selection button that is associated with previousLevel.
        // See specification at https://github.com/phetsims/vegas/issues/90#issuecomment-854034816
        const transitionEndedListener = () => {
          assert && assert( this.transitionNode.hasChild( levelSelectionNode ) && levelSelectionNode.visible );
          levelSelectionNode.getButtonForLevel( previousLevel ).focus();
          transition.endedEmitter.removeListener( transitionEndedListener );
        };
        transition.endedEmitter.addListener( transitionEndedListener );
      }
    } );

    this.addChild( this.transitionNode );

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