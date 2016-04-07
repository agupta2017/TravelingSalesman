public class StupidSalesman
{
	public static void main(String[] args)
	{
		Vertex<Integer> root = new Vertex<Integer>(3);
		Vertex<Integer> connect1 = new Vertex<Integer>(2);
		Vertex<Integer> connect2 = new Vertex<Integer>(63);
		Vertex<Integer> connect3 = new Vertex<Integer>(9);
		Vertex<Integer> connect4 = new Vertex<Integer>(1);
		Vertex<Integer> connect5 = new Vertex<Integer>(5);
		Vertex<Integer> connect6 = new Vertex<Integer>(0);
		Vertex<Integer> connect7 = new Vertex<Integer>(7);
		Vertex<Integer> connect8 = new Vertex<Integer>(16);
		Vertex<Integer> connect9 = new Vertex<Integer>(14);
		Vertex<Integer> connect10 = new Vertex<Integer>(4);
		
		
		Vertex[] vertices = {root,connect1,connect2,connect3,connect4,connect5,connect6,connect7,connect8,connect9,connect10};
		Vertex.connect(vertices);
		Vertex<Integer> current= connect6;
		while(current != null)
		{
			System.out.println(current.value());
			current.changeVisit();
			current = current.findSmallestEdge();
		}
	}	
}
