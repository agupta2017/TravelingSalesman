public class Vertex<E>
{
	private E value;
	private Vector<Integer> weights;
	private Vector<Vertex<E>> vertices;
	private boolean visited;
	
	public Vertex(E v)
	{
		value = v;
		weights = new Vector<Integer>();;
		vertices = new Vector<Vertex<E>>();
		visited = false;
	}
	
	public void addEdge(Vertex<E> vertex, int weight)
	{
		vertices.add(vertex);
		weights.add(weight);
		vertex.vertices.add(this);
		vertex.weights.add(weight);
	}
	public void addSingleDirectionEdge(Vertex<E> vertex, int weight)
	{
		vertices.add(vertex);
		weights.add(weight);
	}
	public void changeVisit()
	{
		visited = !visited;
	}
	
	
	public Vertex<E> findSmallestEdge()
	{
		int x = 0;
		while(x<vertices.size() && vertices.get(x).visited)
		{
			x++;
		}
		if(x >= vertices.size())
		{
			return null;
		}
		int smallest = weights.get(x);
		int smallestIndex = x;
		for(int i = x; i<weights.size(); i++)
		{
			if(weights.get(i) < smallest && !vertices.get(i).getVisited())
			{
				smallest = weights.get(i);
				smallestIndex = i;
			}
		}
		return vertices.get(smallestIndex);
	}
	
	
	public E value()
	{
		return value;
	}
	public boolean getVisited()
	{
		return visited;
	}
	
	public String toString()
	{
		return value.toString();
	}
	
	public static void connect(Vertex<Integer>[] v)
	{
		for(int i = 0; i< v.length-1; i++)
		{
			for(int j = i+1; j<v.length; j++)
			{
				v[i].addEdge(v[j], Math.abs(v[i].value() - v[j].value()));
			}
		}
	}
	
}
