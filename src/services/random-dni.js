class RandomDni {
  constructor(prefix, digitLength) {
    this.prefix = prefix;
    this.digitLength = digitLength;
  }
  generate() {
    const randomDigits = Math.floor(
      Math.random() * Math.pow(10, this.digitLength)
    );
    const randomDni = this.prefix.padEnd(
      this.digitLength - this.prefix.length,
      randomDigits
    );
    return randomDni + this.letter(randomDni);
  }

  /**
   * @param {string} digits
   * @returns {string}
   */
  letter(digits) {
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    return letters.charAt(digits % letters.length);
  }
}

export default RandomDni;
