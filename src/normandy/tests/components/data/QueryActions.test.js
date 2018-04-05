import TestComponent from 'normandy/components/data/QueryActions';

const { WrappedComponent: QueryActions } = TestComponent;

describe('<QueryActions>', () => {
  const props = {
    fetchAllActions: () => {},
  };

  test('should work', () => {
    const wrapper = () => shallow(<QueryActions {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should call fetchAllActions on mount', () => {
    let called = false;
    shallow(
      <QueryActions
        fetchAllActions={() => {
          called = true;
        }}
      />,
    );

    expect(called).toBe(true);
  });

  test('should call fetchAllActions once if container props change', () => {
    let callCount = 0;
    const wrapper = mount(
      <Stub fakeProp={1}>
        <QueryActions
          fetchAllActions={() => {
            callCount += 1;
          }}
        />
      </Stub>,
    );

    wrapper.setProps({ fakeProp: 2 });
    wrapper.setProps({ fakeProp: 3 });
    wrapper.setProps({ fakeProp: 4 });

    expect(callCount).toBe(1);
  });

  test('should not render anything', () => {
    const wrapper = shallow(<QueryActions {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
});
