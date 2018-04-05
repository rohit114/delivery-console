import WrappedFormItem from 'normandy/components/forms/FormItem';

const FormItem = WrappedFormItem.wrappedComponent;

function createFakeEvent(string) {
  return { target: { value: string } };
}

describe('<FormItem>', () => {
  const props = {
    children: <input type="text" />,
    config: {},
    connectToForm: true,
    form: {},
    formErrors: {},
    initialValue: null,
    name: null,
    rules: null,
  };

  test('should work', () => {
    const wrapper = () => shallow(<WrappedFormItem {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should correctly trim whitespace', () => {
    const whitespaceBefore = createFakeEvent('   foobar');
    const whitespaceAfter = createFakeEvent('foobar   ');
    const noWhitespace = createFakeEvent('foobar');

    const expectedValue = 'foobar';
    expect(FormItem.trimValue(whitespaceBefore)).toBe(expectedValue);
    expect(FormItem.trimValue(whitespaceAfter)).toBe(expectedValue);
    expect(FormItem.trimValue(noWhitespace)).toBe(expectedValue);
  });

  test('should not trim whitespace from the middle of a string', () => {
    const whitespaceMiddleString = 'foo    bar';
    const whiteSpaceMiddleEvent = createFakeEvent(whitespaceMiddleString);

    expect(FormItem.trimValue(whiteSpaceMiddleEvent)).toBe(
      whitespaceMiddleString,
    );
  });
});
