export class ResponseData {
  constructor(code, data) {
    this.code = 0
    if(!data) {
      this.data = code
    } else {
      this.code = code
      this.data = data
    }
  }
}