import { source, stripIndent } from 'common-tags';
// @ts-ignore
import { ToastMark } from '@toast-ui/toastmark';
import MarkdownEditor from '@/markdown/mdEditor';
import EventEmitter from '@/event/eventEmitter';
import { getTextContent } from './util';

// @TODO: all tests should move to e2e test

function forceKeymapFn(type: string, methodName: string, args: any[] = []) {
  const { specs, view } = mde;
  // @ts-ignore
  const [keymapFn] = specs.specs.filter(spec => spec.name === type);

  // @ts-ignore
  keymapFn[methodName](...args)(view.state, view.dispatch);
}

let mde: MarkdownEditor, em: EventEmitter, container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  em = new EventEmitter();
  mde = new MarkdownEditor(container, new ToastMark(), em);
});

afterEach(() => {
  document.body.removeChild(container);
});

// @TODO: should add test case after developing the markdown editor API
// describe('move table cell keymap', () => {
// });

describe('extend table keymap', () => {
  it('should extend the table', () => {
    const input = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      | row2 | row2 |
    `;
    const result = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      |  |  |
      | row2 | row2 |
    `;

    mde.setMarkdown(input);
    mde.setSelection([3, 2], [3, 2]);

    forceKeymapFn('table', 'extendTable');

    expect(getTextContent(mde)).toBe(result);
  });

  it('should delete the row in case of empty table content', () => {
    const input = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      |  |  |
    `;
    const result = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
    `;

    mde.setMarkdown(input);
    mde.setSelection([4, 2], [4, 2]);

    forceKeymapFn('table', 'extendTable');

    expect(getTextContent(mde)).toBe(`${result}\n\n`);
  });

  it('should extend table list on multi line selection', () => {
    const input = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      | row2 | row2 |
    `;
    const result = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      | row2 | row2 |
      |  |  |
    `;

    mde.setMarkdown(input);
    mde.setSelection([2, 15], [4, 5]);

    forceKeymapFn('table', 'extendTable');

    expect(getTextContent(mde)).toBe(result);
  });

  it('should not extend the table out of table range', () => {
    const input = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      | row2 | row2 |
    `;
    const result = source`
      | head1 | head2 |
      | --- | --- |
      | row1 | row1 |
      | row2 | row2 |
    `;

    mde.setMarkdown(input);
    mde.setSelection([4, 15], [4, 15]);

    forceKeymapFn('table', 'extendTable');

    expect(getTextContent(mde)).toBe(result);
  });
});

describe('extend block quote keymap', () => {
  it('should extend the block quote', () => {
    mde.setMarkdown('> block');
    mde.setSelection([1, 8], [1, 8]);

    forceKeymapFn('blockQuote', 'extendBlockQuote');

    expect(getTextContent(mde)).toBe('> block\n> ');
  });

  it('should extend the block quote with sliced text', () => {
    mde.setMarkdown('> block');
    mde.setSelection([1, 6], [1, 6]);

    forceKeymapFn('blockQuote', 'extendBlockQuote');

    expect(getTextContent(mde)).toBe('> blo\n> ck');
  });

  it('should extend the block quot on multi line selection', () => {
    mde.setMarkdown('> block1\n> block2');
    mde.setSelection([1, 2], [2, 4]);

    forceKeymapFn('blockQuote', 'extendBlockQuote');

    expect(getTextContent(mde)).toBe('> block1\n> b\n> lock2');
  });

  it('should delete the row in case of empty block quote content', () => {
    mde.setMarkdown('> block\n> ');
    mde.setSelection([2, 2], [2, 2]);

    forceKeymapFn('blockQuote', 'extendBlockQuote');

    expect(getTextContent(mde)).toBe('> block\n\n');
  });
});

describe('extend list keymap', () => {
  describe('bullet list', () => {
    it('should extend the bullet list', () => {
      const input = source`
        * bullet
      `;
      const result = `${source`
        * bullet
        * 
      `} `;

      mde.setMarkdown(input);
      mde.setSelection([1, 9], [1, 9]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the bullet list with sliced text', () => {
      const input = source`
        * bullet
      `;
      const result = source`
        * bull
        * et
      `;

      mde.setMarkdown(input);
      mde.setSelection([1, 7], [1, 7]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the nested bullet list', () => {
      const input = stripIndent`
        * bullet
          * sub
      `;
      const result = `${source`
        * bullet
          * sub
          * 
      `} `;

      mde.setMarkdown(input);
      mde.setSelection([2, 8], [2, 8]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the bullet list excluding blank line', () => {
      const input = `${source`
        * bullet1
        * bullet2
      `}\n\n`;
      const result = `${source`
        * bullet1
        * bullet2
        * 
      `} \n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 10], [2, 10]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the bullet list with task', () => {
      const input = source`
        * [ ] bullet
      `;
      const result = `${source`
        * [ ] bullet
        * [ ] 
      `} `;

      mde.setMarkdown(input);
      mde.setSelection([1, 13], [1, 13]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the bullet list on multi line selection', () => {
      const input = source`
        * bullet1
        * bullet2
      `;
      const result = source`
        * bullet1
        * b
        * ullet2
      `;

      mde.setMarkdown(input);
      mde.setSelection([1, 1], [2, 4]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should delete the row in case of empty bullet list content', () => {
      const input = `${stripIndent`
        * bullet1
        * 
      `} `;
      const result = `${source`
        * bullet1
      `}\n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 2], [2, 2]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should delete the row in case of empty bullet task list content', () => {
      const input = `${stripIndent`
        * [ ] bullet1
        * [ ]
      `} `;
      const result = `${source`
        * [ ] bullet1
      `}\n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 5], [2, 5]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });
  });

  describe('ordered list', () => {
    it('should extend the ordered list', () => {
      const input = source`
        1. ordered
      `;
      const result = `${source`
        1. ordered
        2. 
      `} `;

      mde.setMarkdown(input);
      mde.setSelection([1, 11], [1, 11]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list with sliced text', () => {
      const input = source`
        1. ordered
      `;
      const result = source`
        1. ord
        2. ered
      `;

      mde.setMarkdown(input);
      mde.setSelection([1, 7], [1, 7]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should reorder the list list in the middle of ordered list', () => {
      const input = source`
        1. ordered1
        2. ordered2
        3. ordered3
      `;
      const result = source`
        1. ordered1
        2. 
        3. ordered2
        4. ordered3
      `;

      mde.setMarkdown(input);
      mde.setSelection([1, 12], [1, 12]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the nested ordered list', () => {
      const input = stripIndent`
        1. ordered1
            1. sub1
            2. sub2
        2. ordered2
        3. ordered3
      `;
      const result = stripIndent`
        1. ordered1
            1. sub1
            2. 
            3. sub2
        2. ordered2
        3. ordered3
      `;

      mde.setMarkdown(input);
      mde.setSelection([2, 12], [2, 12]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list on ordered paragraph(not ordered list)', () => {
      const input = stripIndent`
        1. ordered1
            2. sub1
            3. sub2
        2. ordered2
        3. ordered3
      `;
      const result = stripIndent`
        1. ordered1
            2. sub1
            3. 
            4. sub2
        2. ordered2
        3. ordered3
      `;

      mde.setMarkdown(input);
      mde.setSelection([2, 12], [2, 12]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list with task', () => {
      const input = source`
        1. [ ] ordered
      `;
      const result = `${source`
        1. [ ] ordered
        2. [ ]
      `} `;

      mde.setMarkdown(input);
      mde.setSelection([1, 15], [1, 15]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list on multi line selection', () => {
      const input = source`
        1. ordered1
        2. ordered2
      `;
      const result = source`
        1. ordered1
        2. o
        3. rdered2
      `;

      mde.setMarkdown(input);
      mde.setSelection([1, 1], [2, 5]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list excluding blank line', () => {
      const input = `${source`
        1. ordered1
        2. ordered2
      `}\n\n`;
      const result = `${source`
        1. ordered1
        2. ordered2
        3.  
      `} \n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 12], [2, 12]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should delete the row in case of empty ordered list content', () => {
      const input = `${source`
        1. ordered1
        2. 
      `} `;
      const result = `${source`
        1. ordered1 
      `}\n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 2], [2, 2]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should delete the row in case of empty ordered task list content', () => {
      const input = `${stripIndent`
        1. [ ] ordered1
        2. [ ]
      `} `;
      const result = `${source`
        1. [ ] ordered1
      `}\n\n`;

      mde.setMarkdown(input);
      mde.setSelection([2, 6], [2, 6]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });

    it('should extend the ordered list with below bullet list', () => {
      const input = source`
        1. ordered1
        2. ordered2

        * bullet1
        * bullet2
      `;
      const result = source`
        1. ordered1
        2. ordered2
        3. 

        * bullet1
        * bullet2
      `;

      mde.setMarkdown(input);
      mde.setSelection([2, 12], [2, 12]);

      forceKeymapFn('listItem', 'extendList');

      expect(getTextContent(mde)).toBe(result);
    });
  });
});
