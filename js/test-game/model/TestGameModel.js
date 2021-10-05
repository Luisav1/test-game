// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import Property from '../../../../axon/js/Property.js';
import testGame from '../../testGame.js';
import TestGameLevel from './TestGameLevel.js';

class TestGameModel {

  constructor() {

    // @public {TestGameLevel[]}
    this.levels = [

      // Level 1
      new TestGameLevel( 1 ),

      // Level 2
      new TestGameLevel( 2 ),

      // Level 3
      new TestGameLevel( 3 ),

      // Level 3
      new TestGameLevel( 4 )
    ];

    // @public {Property.<null|TestGameLevel>} the selected game level
    // null means 'no selection' and causes the view to return to the level-selection UI
    this.levelProperty = new Property( null, {
      validValues: [ null, ...this.levels ]
    } );
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    //TODO
    this.levels.forEach( level => level.reset() );
    this.levelProperty.reset();
  }

  /**
   * Steps the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    //TODO
  }
}

testGame.register( 'TestGameModel', TestGameModel );
export default TestGameModel;