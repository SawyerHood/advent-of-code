defmodule Day14 do
  def read_str() do
    File.stream!("input.txt")
  end

  def get_info_tuple(str) do
    [_ | rest] = Regex.run(~r/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./, str)
    rest
  end

  def to_format({name, speed, run_time, rest_time}) do
    %{
      name: name,
      speed: String.to_integer(speed),
      run_time: String.to_integer(run_time),
      rest_time: String.to_integer(rest_time),
      resting: false,
      current_distance: 0,
      time_in_phase: 0,
      points: 0
    }
  end

  def simulate(deer) do
    interval_mark = if deer.resting do :rest_time else :run_time end
    next_time = rem(deer.time_in_phase + 1, Map.get(deer, interval_mark))
    deer = %{deer | time_in_phase: next_time}
    deer = if not deer.resting do
      %{deer | current_distance: deer.current_distance + deer.speed}
    else
      deer
    end
    if next_time == 0 do
      %{deer | resting: not deer.resting}
    else
      deer
    end
  end

  def pt2_reducer(curr, next) do
    if next.current_distance > curr.current_distance do
      next
    else
      curr
    end
  end

  def simulate_pt2(deer_list) do
    updated = Enum.map(deer_list, &simulate/1)
    winning_dist = Enum.map(updated, &(&1.current_distance))
      |> Enum.max
    Enum.map(updated, fn deer ->
      if deer.current_distance == winning_dist do
        %{deer | points: deer.points + 1}
      else
        deer
      end
    end)
  end
end

Day14.read_str()
  |> Stream.map(&Day14.get_info_tuple/1)
  |> Stream.map(&List.to_tuple/1)
  |> Stream.map(&Day14.to_format/1)
  |> Stream.iterate(&Day14.simulate_pt2/1)
  |> Enum.fetch(2503)
  |> elem(1)
  |> Enum.map(fn deer -> deer.points end)
  |> Enum.max
  |> IO.puts
