defmodule Day18 do

  @input_file "input.txt"
  @side_len 100

  defp convert_str(str) do
    str == "#"
  end

  def read_input() do
    input = File.stream!(@input_file)
      |> Enum.map(&(Enum.with_index(String.codepoints(&1))))
      |> Enum.with_index
    for {row, x} <- input,
        {item, y} <- row,
        item != "\n",
        val = convert_str(item),
        into: %{},
        do: {{x, y}, val}
  end

  defp get_surrounding_coords({x, y}) do
    for new_x <- x-1..x+1,
        new_y <- y-1..y+1,
        not (new_x == x and new_y == y),
        new_y >= 0 and new_x >= 0,
        new_y < @side_len and new_x < @side_len,
        do: {new_x, new_y}
  end

  defp get_surrounding_vals(map, coords) do
    get_surrounding_coords(coords)
      |> Enum.map(&(Map.get(map, &1, false)))
  end

  defp new_val(map, coords) do
    val = Map.get(map, coords, false)
    surrounding = get_surrounding_vals(map, coords)
    num_on = Enum.filter(surrounding, &(&1))
      |> Enum.count
    cond do
      coords == {0, 0} or coords == {0,99} or coords == {99, 0} or coords == {99, 99} ->
        true
      val and (num_on == 2 or num_on == 3) ->
        true
      val ->
        false
      num_on == 3 ->
        true
      true ->
        false
    end
  end

  def simulate(map) do
    for x <- 0..@side_len-1,
        y <- 0..@side_len-1,
        tuple = {x, y},
        into: %{},
        do: {tuple, new_val(map, tuple)}
  end

end

Day18.read_input
  |> Stream.iterate(&Day18.simulate/1)
  |> Enum.fetch!(100)
  |> Map.values
  |> Enum.filter(&(&1))
  |> Enum.count
  |> IO.puts
