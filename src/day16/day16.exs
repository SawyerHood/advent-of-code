defmodule Day16 do

  @input_file "input.txt"
  @right_sue %{
                children: 3,
                cats: 7,
                samoyeds: 2,
                pomeranians: 3,
                akitas: 0,
                vizslas: 0,
                goldfish: 5,
                trees: 3,
                cars: 2,
                perfumes: 1
              }

  def get_map_from_line(line) do
    [_ | items] = Regex.run(~r/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/, line)
    [sue_num | rem_items] = items
    Enum.chunk(rem_items, 2)
      |> Enum.map(fn two_item_list ->
          [key | rest] = two_item_list
          [val | []] = rest
          {String.to_atom(key), String.to_integer(val)}
        end)
      |> Enum.into(%{})
      |> Map.put(:num, String.to_integer(sue_num))
  end

  def read_sues() do
    File.stream!(@input_file)
    |> Enum.map(&get_map_from_line/1)
  end

  def match_sue(sue_list, fun \\ fn _k, _v1, v2 -> v2 end) do
    for sue <- sue_list,
        {num, new_sue} = Map.pop(sue, :num),
        Map.merge(@right_sue, new_sue, fun) == @right_sue,
        do: num
  end

  def merge_sue_pt2(k, v1, v2) do
    cond do
      (k == :trees or k == :cats) and v2 > v1 ->
        v1
      (k == :pomeranians or k == :goldfish) and v2 < v1 ->
        v1
      true -> v2
    end
  end
end

Day16.read_sues
  |> Day16.match_sue(&Day16.merge_sue_pt2/3)
  |> List.first
  |> IO.inspect
