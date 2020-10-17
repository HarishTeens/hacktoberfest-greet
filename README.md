# Woofy Comment

### A cute little actions which comments on your Pull Request made in the time of Hacktoberfest


## Usage

- Require ```GITHUB_TOKEN``` secret.
- Triggered on ```pull_request_target``` event type.

You can now consume the action by referencing the main Branch.

```yaml
name: Woofy
on: pull_request_target
jobs:
  build:
    runs-on: ubuntu-latest
    steps:      
      - uses: HarishTeens/hacktoberfest-greet@main
        with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

May the Dog be with you! 
