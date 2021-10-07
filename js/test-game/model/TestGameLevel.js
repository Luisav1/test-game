// Copyright 2021, University of Colorado Boulder

/**
 * TestGameLevel is the model for a game level.
 *
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import testGame from '../../testGame.js';

class TestGameLevel {
  /**
   * @param {number} levelNumber
   */
  constructor( levelNumber ) {

    assert && AssertUtils.assertPositiveInteger( levelNumber ); // Level numbering starts from 1.

    // @public (read-only)
    this.levelNumber = levelNumber; // {number}

    // @public The score is the total number of points that have been awarded for this level.
    this.scoreProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: value => ( value >= 0 )
    } );
  }

  /**
   * @public
   */
  reset() {
    this.scoreProperty.reset();
  }
}

testGame.register( 'TestGameLevel', TestGameLevel );
export default TestGameLevel;