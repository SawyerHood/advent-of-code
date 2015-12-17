defmodule Day15 do

  def read_str() do
    File.stream!("input.txt")
  end

  def get_info_tuple(str) do
    Regex.scan(~r/[\-0-9]+/, str)
      |> List.flatten
      |> Enum.map(&String.to_integer/1)
      |> Enum.take(4)
  end

  def get_choices() do
    read_str()
      |> Enum.map(&Day15.get_info_tuple/1)
  end

  def find_greatest(opts) do
    Enum.reduce(opts, [0, 0, 0, 0], fn (winner, next) ->
      winner_negs = Enum.count(winner, &(&1 <= 0))
      next_negs = Enum.count(next, &(&1 <= 0))
      cond do
        winner_negs < next_negs ->
          winner
        next_negs < winner_negs ->
          next  
        calc_score(next) > calc_score(winner) ->
          next
        true ->
          winner
      end
    end)
  end

  def calc_score(tuple) do
    Enum.map(tuple, &(if &1 < 0 do 0 else &1 end))
      |> Enum.reduce(1, &(&1 * &2))
  end

  def next_choice(curr, choices) do
    Enum.map(choices, fn choice -> Enum.zip(choice, curr)
      |> Enum.map(&(elem(&1, 0) + elem(&1, 1)))
    end)
      |> find_greatest
  end

end

choices = Day15.get_choices()
Stream.iterate([0, 0, 0, 0], &(Day15.next_choice(&1, choices)))
  |> Enum.fetch!(100)
  |> Day15.calc_score
  |> IO.puts
