defmodule Day15Pt2 do

  def read_str() do
    File.stream!("input.txt")
  end

  def get_info_tuple(str) do
    Regex.scan(~r/[\-0-9]+/, str)
      |> List.flatten
      |> Enum.map(&String.to_integer/1)
  end

  def get_choices() do
    read_str()
      |> Enum.map(&Day15Pt2.get_info_tuple/1)
  end

  def calc_score(tuple) do
    Enum.take(tuple, 4)
      |> Enum.map(&(if &1 < 0 do 0 else &1 end))
      |> Enum.reduce(1, &(&1 * &2))
  end

  def add_ingredients(in1, in2) do
    Enum.zip(in1, in2)
      |> Enum.map(&(elem(&1, 0) + elem(&1, 1)))
  end

  def gen_combos(choices) do
    for a <- 0..100,
        b <- 0..(100-a),
        c <- 0..(100-(a + b)),
        d = (100-(a + b + c)),
        combo = [a, b, c, d],
        cookie = combo_to_cookie(combo, choices),
        Enum.at(cookie, 4) == 500,
        do: calc_score(cookie)
  end

  def combo_to_cookie(combo, choices) do
    Enum.zip(combo, choices)
      |> Enum.map(fn tuple ->
        {num, choice} = tuple
        Enum.map(choice, &(&1 * num))
      end)
      |> Enum.reduce([0, 0, 0, 0, 0], &(add_ingredients(&1, &2)))
  end

end

choices = Day15Pt2.get_choices()
Day15Pt2.gen_combos(choices)
  |> Enum.max
  |> IO.puts
