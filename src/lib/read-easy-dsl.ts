export interface DslMark {
  key: string;
  value?: string;
}

export interface DslMarkedText {
  text: string;
  marks: DslMark[];
  raw: string;
  content: Array<DslMarkedText | string>;
}

export interface DslBlock {
  type: string;
  content: Array<DslBlock | string>;
  raw: string;
}

export function parseMarkedText(text: string): Array<DslMarkedText | string> {
  const result: Array<DslMarkedText | string> = [];
  let currentPos = 0;

  while (currentPos < text.length) {
    const startBracket = text.indexOf("[", currentPos);
    const separator = text.slice(currentPos).match(/\{(\/\/|\/|\|)\}/);
    const separatorPos = separator ? currentPos + separator.index! : -1;

    if (startBracket === -1 && separatorPos === -1) {
      const remainingText = text.slice(currentPos);
      if (remainingText) {
        result.push(remainingText);
      }
      break;
    }

    if (separatorPos !== -1 && (startBracket === -1 || separatorPos < startBracket)) {
      if (separatorPos > currentPos) {
        result.push(text.slice(currentPos, separatorPos));
      }
      result.push(separator![0]);
      currentPos = separatorPos + separator![0].length;
      continue;
    }

    if (startBracket > currentPos) {
      result.push(text.slice(currentPos, startBracket));
    }

    let depth = 1;
    let endBracket = startBracket + 1;
    while (depth > 0 && endBracket < text.length) {
      if (text[endBracket] === "[") depth++;
      if (text[endBracket] === "]") depth--;
      endBracket++;
    }

    if (depth > 0) {
      result.push(text.slice(currentPos));
      break;
    }

    const markedContent = text.slice(startBracket + 1, endBracket - 1);
    const marks: DslMark[] = [];
    let markPos = endBracket;

    while (markPos < text.length && text[markPos] === "@") {
      const markMatch = text.slice(markPos).match(/^@(\w+)(?:{([^}]*)})?/);
      if (!markMatch) break;

      const [fullMatch, key, value] = markMatch;
      marks.push({ key, value });
      markPos += fullMatch.length;
    }

    if (marks.length > 0) {
      result.push({
        text: markedContent,
        marks,
        raw: text.slice(startBracket, markPos),
        content: parseMarkedText(markedContent)
      });
      currentPos = markPos;
    } else {
      result.push(text.slice(startBracket, endBracket));
      currentPos = endBracket;
    }
  }

  return result;
}

export function parseBlocks(text: string): Array<DslBlock | string> {
  const result: Array<DslBlock | string> = [];
  let currentPos = 0;

  while (currentPos < text.length) {
    const startTagMatch = text.slice(currentPos).match(/<(\w+)>/);

    if (!startTagMatch) {
      const remainingText = text.slice(currentPos);
      if (remainingText.trim()) {
        result.push(remainingText);
      }
      break;
    }

    const startTagPos = currentPos + startTagMatch.index!;

    if (startTagPos > currentPos) {
      const textBefore = text.slice(currentPos, startTagPos);
      if (textBefore.trim()) {
        result.push(textBefore);
      }
    }

    const tagName = startTagMatch[1];
    const endTag = `</${tagName}>`;
    let depth = 1;
    let endTagPos = startTagPos + startTagMatch[0].length;
    let foundEndTag = false;

    while (depth > 0 && endTagPos < text.length) {
      const nextStartTag = text.indexOf(`<${tagName}>`, endTagPos);
      const nextEndTag = text.indexOf(endTag, endTagPos);

      if (nextEndTag === -1) {
        endTagPos = text.length;
        foundEndTag = false;
        break;
      }

      if (nextStartTag !== -1 && nextStartTag < nextEndTag) {
        depth++;
        endTagPos = nextStartTag + tagName.length + 2;
      } else {
        depth--;
        endTagPos = nextEndTag;
        if (depth === 0) {
          foundEndTag = true;
        }
      }
    }

    const innerContent = text.slice(
      startTagPos + startTagMatch[0].length,
      foundEndTag ? endTagPos : text.length
    );

    result.push({
      type: tagName,
      content: parseBlocks(innerContent),
      raw: text.slice(startTagPos, foundEndTag ? endTagPos + endTag.length : text.length)
    });

    currentPos = foundEndTag ? endTagPos + endTag.length : text.length;
  }

  return result;
}
