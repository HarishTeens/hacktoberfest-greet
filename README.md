# Woofy Comment

### A cute little actions which comments on your Pull Request made in the time of Hacktoberfest


## Usage

- Require ```GITHUB_TOKEN``` secret.
- Triggered on ```pull_request_target``` event type.

You can now consume the action by referencing the v1.0.2 tag.

```yaml
- uses: HarishTeens/woofy-actions@v1.0.2
  with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

May the Dog be with you! 
