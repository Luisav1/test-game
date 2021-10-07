// Copyright 2021, University of Colorado Boulder

/**
 * WaveGameLevelNode is the view for a game level.
 *
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import InfiniteStatusBar from '../../../../vegas/js/InfiniteStatusBar.js';
import testGame from '../../testGame.js';

class TestGameLevelNode extends Node {

  /**
   * @param {TestGameLevel} level
   * @param {Property.<TestGameLevel>} levelProperty
   * @param {Bounds2} layoutBounds
   * @param {Property.<Bounds2>} visibleBoundsProperty
   */
  constructor( level, levelProperty, layoutBounds, visibleBoundsProperty ) {

    super();

    // Level description, displayed in the status bar
    const levelDescriptionText = new RichText( level.statusBarMessage, {
      font: new PhetFont( 16 ),
      maxWidth: 650 // determined empirically
    } );

    // Bar across the top of the screen
    const statusBar = new InfiniteStatusBar( layoutBounds, visibleBoundsProperty, levelDescriptionText, level.scoreProperty, {
      floatToTop: false,
      spacing: 20,
      backButtonListener: () => {
        this.interruptSubtreeInput();
        levelProperty.value = null; // back to the level-selection UI
      }
    } );
    this.addChild( statusBar );

    //------------------------------------------------------------------------------------------------------------------
    // Class fields
    //------------------------------------------------------------------------------------------------------------------

    // @public
    this.level = level; // {WaveGameLevel}

    // @private
    this.layoutBounds = layoutBounds; // {Bounds2}

  }
}

testGame.register( 'TestGameLevelNode', TestGameLevelNode );
export default TestGameLevelNode;