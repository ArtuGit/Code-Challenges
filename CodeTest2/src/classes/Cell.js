export class Cell {
  constructor(isMine = false) {
    this._isMine = isMine;
    this._isRevealed = true;
    if (this._isMine) {
      this._value = "*";
    } else {
      this._value = 0;
    }
  }

  get isMine() {
    return this._isMine;
  }

  get value() {
    return this._isMine ? "*" : this._value;
  }

  set value(value) {
    if (this._isMine) {
      console.log("Error: Cannot set value of a mine");
      return;
    }
    this._value = value;
  }

  getDisplayValue(testMode = false) {
    return (this._isRevealed) ? "#" : this._value;
  }

  reveal() {
    this._isRevealed = true;
  }
}
