// Copyright 2021, University of Colorado Boulder

/**
 * WaveGameLevelNode is the view for a game level.
 *
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import testGame from '../../testGame.js';

class TestGameLevelNode extends Node {

  /**
   * @param {TestGameLevel} level
   * @param {Property.<TestGameLevel>} levelProperty
   * @param {Bounds2} layoutBounds
   */
  constructor( level, levelProperty, layoutBounds ) {

    super();

    // Level description, displayed in the status bar
    const levelDescriptionText = new RichText( 'testing', {
      font: new PhetFont( 16 ),
      maxWidth: 650 // determined empirically
    } );
    this.addChild( levelDescriptionText );

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