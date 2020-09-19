# Woofy Comment

### A cute little actions which comments on your Pull Request


## Usage

- Require ```GITHUB_TOKEN``` secret.
- Triggered on ```pull_request_target``` event type.

You can now consume the action by referencing the v1.0.3 tag.

```yaml
name: Woofy
on: pull_request_target
jobs:
  build:
    runs-on: ubuntu-latest
    steps:      
      - uses: HarishTeens/woofy-actions@v1.0.3
        with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

May the Dog be with you! 
