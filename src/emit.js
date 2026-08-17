export default function emit(eventName, detail) {
    document.dispatchEvent(
      new CustomEvent(eventName, { detail })
    )
  }