package beans;

public interface Identifiable<T> {
	public T id();
	public void updateId(T id);
}
