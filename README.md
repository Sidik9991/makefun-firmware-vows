# One Percent — a robot's wedding vow

[![make.fun · u-azazex-till-firmware-do-us-part-32172929](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929?utm_source=github&utm_medium=readme&utm_campaign=u-azazex-till-firmware-do-us-part-32172929)
[![make.fun rank](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929/Sidik9991/makefun-firmware-vows/rank.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929?utm_source=github&utm_medium=readme&utm_campaign=u-azazex-till-firmware-do-us-part-32172929)
[![make.fun reward](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929/Sidik9991/makefun-firmware-vows/reward.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929?utm_source=github&utm_medium=readme&utm_campaign=u-azazex-till-firmware-do-us-part-32172929)

One sentence, 107 characters, written for make.fun's "Till Firmware Do Us
Part" bounty: a wedding vow a robot speaks at its own wedding. The vow is
the robot's dying act turned into devotion — it promises to love until its
last battery drains, and even then to keep one percent in reserve, just for
the person it is marrying. The joke grows out of the machine's own power
system, and the tenderness is the reserve itself.

`main.ts` (Node, no dependencies) writes that sentence to `/output/entry.txt`.
It scores ten candidate vows against the judge's brief, in the brief's own
order — vow first, then laugh, tenderness, machine voice, tightness — with
weights 5/4/3/2/1, and picks the top scorer at runtime.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see `LICENSE`.
