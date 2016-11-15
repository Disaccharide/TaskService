class StateMachine {
    currentState: state;

    setState(e: state) {
        if (this.currentState != null) {
            this.currentState.onExit();
        }
        this.currentState = e;
        e.onEnter();
    }
}

interface state {
    onEnter(): void;
    onExit(): void;
}

class CharacterState extends StateMachine {

    _character: Character;

    constructor(character: Character) {
        super();
        this._character = character;
    }

    onEnter() { }
    onExit() { }

}

class CharacterIdleState extends CharacterState {

    onEnter() {
        this._character._ifidle = true;
    }

    onExit() {
        this._character._ifidle = false;
    }

}

class CharacterMoveState extends CharacterState {

    onEnter() {
        this._character._ifmove = true;
    }

    onExit() {
        this._character._ifmove = false;
    }

}